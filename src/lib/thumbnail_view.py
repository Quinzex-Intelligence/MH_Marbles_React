"""
Thumbnail generation view for Django — resizes images on the fly using Pillow.
Serves cached thumbnails from /api/thumbnail/?url=<image_url>&w=400&h=500

Add to core/thumbnail.py and wire to urls.py
"""
from django.http import HttpResponse, Http404
from django.core.cache import cache
from django.views.decorators.http import require_GET
from django.views.decorators.cache import cache_control
import urllib.request
import urllib.error
from PIL import Image
import io
import hashlib
import os


@require_GET
@cache_control(max_age=86400, public=True)  # Cache in browser for 24h
def thumbnail_view(request):
    """
    GET /api/thumbnail/?url=<image_url>&w=600&h=750&q=75
    Returns a JPEG thumbnail at requested dimensions.
    Caches aggressively in-memory (Django cache) and sends browser cache headers.
    """
    url = request.GET.get('url', '').strip()
    w = min(int(request.GET.get('w', 600)), 1200)   # max allowed width
    h = min(int(request.GET.get('h', 750)), 1500)   # max allowed height
    q = min(int(request.GET.get('q', 72)), 90)       # quality, default 72

    if not url:
        raise Http404("url parameter required")

    # Cache key based on url + dimensions + quality
    cache_key = 'thumb_' + hashlib.md5(f"{url}_{w}_{h}_{q}".encode()).hexdigest()
    cached = cache.get(cache_key)
    if cached:
        return HttpResponse(cached, content_type='image/jpeg')

    # Fetch origin image
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=8) as resp:
            raw_data = resp.read()
    except (urllib.error.URLError, Exception) as e:
        # If we can't fetch, redirect to the original (graceful fallback)
        from django.http import HttpResponseRedirect
        return HttpResponseRedirect(url)

    # Resize with Pillow
    try:
        img = Image.open(io.BytesIO(raw_data)).convert('RGB')
        img.thumbnail((w, h), Image.LANCZOS)
        buf = io.BytesIO()
        img.save(buf, format='JPEG', quality=q, optimize=True, progressive=True)
        thumbnail_bytes = buf.getvalue()
    except Exception:
        # Return original on any Pillow error
        return HttpResponse(raw_data, content_type='image/jpeg')

    # Cache for 1 hour in-memory
    cache.set(cache_key, thumbnail_bytes, 3600)

    return HttpResponse(thumbnail_bytes, content_type='image/jpeg')

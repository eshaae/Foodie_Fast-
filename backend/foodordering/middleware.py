from datetime import datetime
from django.http import JsonResponse

class OrderTimeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        now = datetime.now()
        hour = now.hour
        opening = 9
        closing = 9

        # Only block order-related API endpoints
        if request.path.startswith("/order/") or request.path.startswith("/checkout/"):
            if hour < opening or hour >= closing:
                return JsonResponse({
                    "status": "closed",
                    "message": "Restaurant is closed. You can browse the menu, but ordering is available only between 9 AM - 9 PM."
                }, status=403)

        return self.get_response(request)

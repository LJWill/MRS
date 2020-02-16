from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import math


class CustomPagination(PageNumberPagination):
    max_page_size = 10000
    page_size = 20
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'total': self.page.paginator.count,
            'page_number': math.ceil(self.page.paginator.count / self.page_size),
            'page_size': int(self.request.GET.get('page_size', self.page_size)),
            'results': data
        })
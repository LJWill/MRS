



def jwt_response_payload_handler(token, user=None, request=None):
    """
    customized response type
    """
    
    return {
        'token': token,
        'user_id': user.id,
        'username': user.username
    }
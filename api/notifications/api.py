from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView
from sqlalchemy import desc

from models.products import Notification, Product
from models.base import db

from .utils import send_message

notification_blueprint = Blueprint('notifications', __name__)


class NotificationAPIView(MethodView):
    def put(self, product_id=None, notification_id=None):
        data = request.get_json(force=True)

        if product_id is None:
            return make_response({'error': 'Product id is required'}), 400
        if notification_id is None:
            return make_response({'error': 'Notification id is required'}), 400
        if 'message' not in data.keys():
            return make_response(jsonify({'error': 'Notification message is required'})), 400

        if data.get('sendTo', None) and data.get('draft') is False:
            send_message(data)

        notification = Notification.query.filter_by(product_id=product_id, id=notification_id).first()
        notification.message = data.get('message')
        notification.send_to = data.get('sendTo')
        db.session.add(notification)
        db.session.commit()

        return make_response(jsonify(data)), 200

    def delete(self, product_id=None):
        return make_response(jsonify({'message': 'not implemented'}))

    def post(self, product_id=None):
        data = request.get_json(force=True)

        if product_id is None:
            return make_response({'error': 'Product id is required'}), 400
        if 'message' not in data.keys():
            return make_response(jsonify({'error': 'Notification message is required'})), 400

        product = Product.query.filter_by(id=product_id).first()

        notification = Notification(
            message=data.get('message'),
            send_to=data.get('sendTo', ''),
            product=product,
            draft=data.get('draft', True)
        )

        if data.get('sendTo', None) and data.get('draft') is False:
            send_message(data)

        db.session.add(notification)
        db.session.commit()

        data['product_name'] = product.name

        return make_response(jsonify(data))

    def get(self, notification_id=None, product_id=None):
        notification_qs = Notification.query.order_by(desc(Notification.id))
        if notification_id:
            notification_qs = notification_qs.filter_by(product_id=product_id, id=notification_id)

        return make_response(jsonify([i.serialize for i in notification_qs])), 200


notification_view = NotificationAPIView.as_view('notification_view')

notification_blueprint.add_url_rule(
    '/api/<int:product_id>/notifications',
    view_func=notification_view,
    methods=['GET', 'POST']
)
notification_blueprint.add_url_rule(
    '/api/<int:product_id>/notifications/<int:notification_id>',
    view_func=notification_view,
    methods=['PUT', 'DELETE', 'GET', ]
)
notification_blueprint.add_url_rule(
    '/api/notifications/<int:notification_id>',
    view_func=notification_view,
    methods=['GET']
)

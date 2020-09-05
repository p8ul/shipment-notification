from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView
from sqlalchemy import desc

from models.products import Product
from models.base import db

products_blueprint = Blueprint('products', __name__)


class ProductAPIView(MethodView):
    def put(self, product_id=None):
        return make_response(jsonify({'message': 'not implemented'}))

    def delete(self, product_id=None):
        return make_response(jsonify({'message': 'not implemented'}))

    def post(self, ):
        data = request.get_json(force=True)
        if 'name' not in data.keys():
            return make_response(jsonify({'error': 'Name of the product is required'})), 400
        if 'description' not in data.keys():
            return make_response(jsonify({'error': 'Description of the product is required'})), 400

        product = Product(
            name=data.get('name'),
            description=data.get('description'),
            image=data.get('image', ''),
        )
        db.session.add(product)
        db.session.commit()
        return make_response(jsonify(data))

    def get(self, product_id=None,):
        products_qs = Product.query.order_by(desc(Product.id))
        if product_id:
            products_qs = products_qs.filter_by(id=product_id)

        return make_response(jsonify([i.serialize for i in products_qs])), 200


products_view = ProductAPIView.as_view('product_view')

products_blueprint.add_url_rule(
    '/api/products',
    view_func=products_view,
    methods=['PUT', 'DELETE', 'GET', 'POST']
)

products_blueprint.add_url_rule(
    '/api/products/<int:product_id>',
    view_func=products_view,
    methods=['GET']
)

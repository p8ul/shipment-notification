from flask import Blueprint, jsonify

from models.products import Product

main = Blueprint('main', __name__)


@main.route('/')
def index():
    res = {}
    for user in Product.query.all():
        res[user.id] = user.name
    return jsonify(res)

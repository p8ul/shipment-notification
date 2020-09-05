from sqlalchemy import desc
from .core import Mixin
from .base import db


class Notification(Mixin, db.Model):
    __tablename__ = "notification"

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(204),)
    send_to = db.Column(db.String(16),)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    draft = db.Column(db.Boolean(), default=False)

    def __repr__(self):
        return f"<Notification {self.message}>"

    @property
    def serialize(self):
        return {
            'id': self.id,
            'message': self.message,
            'sendTo': self.send_to,
            'productId': self.product_id
        }


class Product(Mixin, db.Model):
    """Product Table."""
    __tablename__ = "product"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, )
    description = db.Column(db.String, )
    notifications = db.relationship('Notification', backref='product', lazy='dynamic')

    def __repr__(self):
        return f"<Product {self.name}>"

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image': self.image,
            'notifications': self.serialize_notifications
        }

    @property
    def serialize_notifications(self):
        return [i.serialize for i in self.notifications.order_by(desc(Notification.id))]

import os
import sys

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    APP_NAME = os.environ.get('APP_NAME', 'Flask-Base')

    SECRET_KEY = os.environ.get('SECRET_KEY', 'YOUSHOULDNOTHAVEADEFAULTSECRET')

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    ASSETS_DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI',
                                             'postgresql://stack:stack@127.0.0.1:5432/stack')

    # SQLALCHEMY_DATABASE_URI = 'postgresql://stack:stack@127.0.0.1:5432/stack'
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL',
    #                                          'sqlite:///' + os.path.join(basedir, 'data-dev.sqlite'))

    @classmethod
    def init_app(cls, app):
        print('THIS APP IS IN DEBUG MODE. \
                YOU SHOULD NOT SEE THIS IN PRODUCTION.')


config = {
    'development': DevelopmentConfig,
}

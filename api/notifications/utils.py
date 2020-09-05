import os
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException

account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')
from_ = os.getenv('TWILIO_NUMBER', '')


def send_message(data):
    try:
        client = Client(account_sid, auth_token)

        message = client.messages.create(
            from_=f'+{from_.replace("+", "")}',
            body=data.get('message'),
            to=data.get('sendTo').replace(' ', '')
        )
        print(message)
    except TwilioRestException as e:
        print(e)

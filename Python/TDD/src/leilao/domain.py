import sys


class User:

    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name


class Bid:

    def __init__(self, user, value):
        self.user = user
        self.value = value

    def __str__(self):
        return f"User **{self.user._name}** bid **${self.value:.2f}** <"


class Auction:

    def __init__(self, description):
        self.description = description
        self._bids = []

    @property
    def bids(self):
        return self._bids


class Evaluator:

    def __init__(self):
        self._greatest_bid = sys.float_info.min
        self._lowest_bid = sys.float_info.max

    @property
    def greatest_bid(self): return self._greatest_bid

    @property
    def lowest_bid(self): return self._lowest_bid

    def evaluate(self, auction: Auction):
        for bid in auction.bids:
            if bid.value > self._greatest_bid:
                self._greatest_bid = bid.value
            elif bid.value < self._lowest_bid:
                self._lowest_bid = bid.value

    def auction_status(self):
        return f"Greatest bid: ${self._greatest_bid:.2f}\nLowest bid: ${self._lowest_bid:.2f}"
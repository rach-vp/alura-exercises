from src.leilao.exceptions import InvalidBid

class User:

    def __init__(self, name, balance):
        self._name = name
        self._balance = balance

    @property
    def name(self): return self._name

    @property
    def balance(self): return self._balance

    def place_proposal(self, auction, value):
        if (value > self._balance):
            raise InvalidBid('Bid value is greater than user balance.')
        auction.propose(Bid(self, value))
        self._balance -= value


class Bid:

    def __init__(self, user, value):
        self.user = user
        self.value = value

    def __str__(self):
        return f'\nUser **{self.user._name}** bid **${self.value:.2f}** <'


class Auction:

    def __init__(self, description):
        self.description = description
        self._bids = []

    @property
    def bids(self): return self._bids[:]

    @property
    def greatest_bid(self): return self._greatest_bid

    @property
    def lowest_bid(self): return self._lowest_bid

    def __str__(self):
        return f'\nBids: {len(self._bids)}\nGreatest bid: ${self._greatest_bid:.2f}\nLowest bid: ${self._lowest_bid:.2f}'

    def is_same_user(self, bid):
        if (not self._bids or self._bids[-1].user != bid.user):
            return False
        raise InvalidBid('Same usar cannot bid twice in a row')

    def is_in_ascending_order(self,bid):
        if (self._bids and self._bids[-1].value > bid.value):
            raise InvalidBid('Bid value is lower than previous bid value.')
        return True

    def propose(self, bid):
        if (not self.is_same_user(bid) and self.is_in_ascending_order(bid)):
            if (not self._bids):
                self._lowest_bid = bid.value
            self._greatest_bid = bid.value
            self._bids.append(bid)

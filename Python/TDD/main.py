from domain import User, Bid, Auction, Evaluator

user1 = User('Raquel')
user2 = User('Will')
evaluator = Evaluator()

user1_bid = Bid(user1, 100)
user2_bid = Bid(user2, 150)

auction = Auction('Celular')

auction.bids.append(user1_bid)
auction.bids.append(user2_bid)

for bid in auction.bids:
    print(bid)

evaluator.evaluate(auction)
print(evaluator.auction_status())

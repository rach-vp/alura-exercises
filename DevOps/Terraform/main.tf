provider "aws" {
  region  = "us-east-1"
  profile = "personal"
}

provider "aws" {
  alias   = "us-east-2"
  region  = "us-east-2"
  profile = "personal"
}

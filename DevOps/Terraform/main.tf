provider "aws" {
  # version = "~> 4.0"
  region  = "us-east-1"
  profile = "personal"
}

resource "aws_instance" "dev" {
  count          = 3
  ami           = "ami-0b0dcb5067f052a63"
  instance_type = "t2.micro"
  key_name      = "terraform-aws-alura"
  tags          = {
    "Name" = "dev-${count.index}"
  }
}

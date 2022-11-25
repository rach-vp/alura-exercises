variable "IP_ADDRESS" {
  type = string
  description = "IP address received in env vars"
}

provider "aws" {
  # version = "~> 4.0"
  region  = "us-east-1"
  profile = "personal"
}

resource "aws_security_group" "ssh_access" {
  name        = "ssh_access"
  description = "Allow SSH access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${var.IP_ADDRESS}/32"]
  }

  tags = {
    Name = "ssh_access"
  }
}

resource "aws_instance" "dev" {
  count          = 3
  ami           = "ami-0b0dcb5067f052a63"
  instance_type = "t2.micro"
  key_name      = "terraform-aws-alura"
  tags          = {
    "Name" = "dev-${count.index}"
  }
  vpc_security_group_ids = ["sg-05b8fe4e6097e24db"]
}

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
  vpc_security_group_ids = ["${aws_security_group.ssh_access.id}"]
}

resource "aws_s3_bucket" "dev3-s3" {
  bucket = "terraform-aws-alura-dev3"

  tags = {
    Name = "terraform-aws-alura-dev3"
  }
}

resource "aws_s3_bucket_acl" "dev3-s3-acl" {
  bucket = aws_s3_bucket.dev3-s3.id
  acl    = "private"
}

resource "aws_instance" "dev3" {
  ami           = "ami-0b0dcb5067f052a63"
  instance_type = "t2.micro"
  key_name      = "terraform-aws-alura"
  tags          = {
    "Name" = "dev-3"
  }
  vpc_security_group_ids = ["${aws_security_group.ssh_access.id}"]
  depends_on = [
    aws_s3_bucket.dev3-s3
  ]
}

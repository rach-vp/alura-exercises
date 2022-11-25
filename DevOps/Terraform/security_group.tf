resource "aws_security_group" "ssh_access-us-east-1" {
  name        = "ssh_access-us-east-1"
  description = "Allow SSH access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${var.IP_ADDRESS}/32"]
  }

  tags = {
    Name = "ssh_access-us-east-1"
  }
}

resource "aws_security_group" "ssh_access-us-east-2" {
  provider    = aws.us-east-2
  name        = "ssh_access-us-east-2"
  description = "Allow SSH access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${var.IP_ADDRESS}/32"]
  }

  tags = {
    Name = "ssh_access-us-east-2"
  }
}

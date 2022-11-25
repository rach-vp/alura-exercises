variable "IP_ADDRESS" {
  type = string
  description = "IP address received in env vars"
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

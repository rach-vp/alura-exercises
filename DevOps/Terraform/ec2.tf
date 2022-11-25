resource "aws_instance" "dev" {
  count                  = 3
  ami                    = var.amis["us-east-1"]
  instance_type          = "t2.micro"
  key_name               = var.KEY_PAIR_NAME
  vpc_security_group_ids = ["${aws_security_group.ssh_access-us-east-1.id}"]

  tags = {
    "Name" = "dev-${count.index}"
  }
}

resource "aws_instance" "dev3" {
  ami                    = var.amis["us-east-1"]
  instance_type          = "t2.micro"
  key_name               = var.KEY_PAIR_NAME
  vpc_security_group_ids = ["${aws_security_group.ssh_access-us-east-1.id}"]

  tags = {
    "Name" = "dev-3"
  }

  depends_on = [
    aws_s3_bucket.dev3-s3
  ]
}

resource "aws_instance" "dev4" {
  provider               = aws.us-east-2
  ami                    = var.amis["us-east-2"]
  instance_type          = "t2.micro"
  key_name               = var.KEY_PAIR_NAME
  vpc_security_group_ids = ["${aws_security_group.ssh_access-us-east-2.id}"]

  tags = {
    "Name" = "dev-3"
  }

  depends_on = [
    aws_dynamodb_table.basic-dynamodb-table
  ]
}

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

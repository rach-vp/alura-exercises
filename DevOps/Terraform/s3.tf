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
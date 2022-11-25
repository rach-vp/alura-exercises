variable "amis" {
  type = map(string)
  description = "AMI IDs for EC2 instances per region"
  default = {
    us-east-1 = "ami-0b0dcb5067f052a63"
    us-east-2 = "ami-0beaa649c482330f7"
  }
}

variable "KEY_PAIR_NAME" {
  type = string
  description = "Public key pair name for EC2 instances"
}

variable "IP_ADDRESS" {
  type = string
  description = "IP address received in env vars"
}

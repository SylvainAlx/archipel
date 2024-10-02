export class CreateUserDto {
  name: string = "";
  password: string = "";
  gender: string = "";
  langage: string = "";
}

export class LoginDto {
  name: string = "";
  password: string = "";
}

export class RecoveryDto {
  name: string = "";
  recovery: string = "";
  newPassword: string = "";
}

export class ResetPasswordDto {
  oldPassword: string = "";
  newPassword: string = "";
}

export class CitizenshipDto {
  status: number = -1;
  nationId: string = "";
  nationOwner: boolean = false;
}

export class UpdateUserDto {
  officialId: string = "";
  name: string = "";
  gender: string = "";
  langage: string = "";
  avatar: string = "";
  role: string = "";
  citizenship!: CitizenshipDto;
}

export class ChangeStatusDto {
  officialId: string = "";
  nationId: string = "";
  status: number = -1;
}

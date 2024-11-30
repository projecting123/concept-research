import { FormControl } from "@angular/forms"

export interface SignupResponse{
    statusCode: number,
    message: string
}

export interface LoginResponse{
    statusCode: number,
    message: string,
    userInfo: UserInfo
}

export interface UserInfo{
    userId: string,
    name: string,
}

export interface FormDataType{
    name?: FormControl<string | null>,
    email: FormControl<string | null>,
    password: FormControl<string | null>,
    confirm_password?: FormControl<string | null>
}
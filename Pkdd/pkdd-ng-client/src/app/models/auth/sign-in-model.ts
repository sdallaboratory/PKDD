export class SignInModel {

    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly remember: boolean,
    ) { }

}

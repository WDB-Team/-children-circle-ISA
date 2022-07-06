export default class User {
  constructor(id, full_Name, email, password, residencia, little_Description) {
    this._id = id;
    this.full_Name = full_Name;
    this.email = email;
    this.password = password;
    this.residencia = residencia;
    this.little_Description = little_Description;
  }

  static fromJson(user) {
    return new User(
      user._id,
      user.full_Name,
      user.email,
      user.password,
      user.residencia,
      user.little_Description
    );
  }
}

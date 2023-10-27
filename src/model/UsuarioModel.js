class Usuario {
    constructor(id, firstname, lastname, email, phone) {
        this._id = id;
        this._firstname = firstname;
        this._lastname = lastname;
        this._email = email;
        this._phone = phone;
    }

    // Getter y setter para el ID
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    // Getter y setter para el primer nombre
    get firstname() {
        return this._firstname;
    }
    set firstname(firstname) {
        this._firstname = firstname;
    }

    // Getter y setter para el apellido
    get lastname() {
        return this._lastname;
    }
    set lastname(lastname) {
        this._lastname = lastname;
    }

    // Getter y setter para el correo
    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }

    // Getter y setter para el teléfono
    get phone() {
        return this._phone;
    }
    set phone(phone) {
        this._phone = phone;
    }

    // Método para convertir el objeto Usuario a un formato que se pueda guardar en la base de datos
    toDatabaseObject() {
        return {
            id: this._id,
            firstname: this._firstname,
            lastname: this._lastname,
            email: this._email,
            phone: this._phone,
        };
    }

    // Método para crear una instancia de Usuario a partir de un objeto de la base de datos
    static fromDatabaseObject(dbObject) {
        const { id, firstname, lastname, email, phone } = dbObject;
        return new Usuario(id, firstname, lastname, email, phone);
    }
}

module.exports = Usuario;

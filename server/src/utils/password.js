import argon2 from 'argon2'

export const hash = async(password) => {
    return argon2.hash(password)
}

export const verify = async(
    passwordHash,
    password
) => {
    return argon2.verify(passwordHash, password)
}
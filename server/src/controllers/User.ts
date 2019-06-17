import { boomify } from 'boom'

import { UserModel } from '../data'
import { Request, Response } from '../types'
import { hash } from '../utils'

export const listUsers = async (req: Request, res: Response) => {
  try {
    req.checkAdmin()
    return await UserModel.find({}, '-auth, -token')
  } catch (e) {
    throw boomify(e)
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    req.checkAdminOrSame(userId)
    return await UserModel.findById(userId, '-auth -token')
  } catch (e) {
    throw boomify(e)
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    req.checkAdmin()
    const user = new UserModel(req.body)
    if (user.auth.password) {
      user.auth.password = await hash(user.auth.password)
    }
    return user.save()
  } catch (e) {
    throw boomify(e)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    req.checkAdminOrSame(userId)
    let userData = req.body
    if (!req.isAdmin()) {
      const { token, admin, auth, ...rest } = userData
      userData = rest
    }
    if (userData.auth.password) {
      userData.auth.password = await hash(userData.auth.password)
    }
    return await UserModel.findByIdAndUpdate(
      userId,
      { $set: userData },
      { new: true }
    )
  } catch (e) {
    throw boomify(e)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    req.checkAdminOrSame(userId)
    await UserModel.findByIdAndDelete(userId)
    return null
  } catch (e) {
    throw boomify(e)
  }
}

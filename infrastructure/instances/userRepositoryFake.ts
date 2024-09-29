import { type Http } from "@domain/repositories/http"
import { type UserRepository } from "@domain/repositories/userRepository"
import { userRepository } from "@infrastructure/repositories/userRepository"

import { httpFake } from "../../infrastructure/instances/httpFake"

const client: Http = httpFake

export const userRepositoryFake: UserRepository = userRepository(client)

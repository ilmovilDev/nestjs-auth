import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { HandleErrors } from 'src/common/services/handle-errors.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {
  private readonly bcrypt_salt: number;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly handleErrors: HandleErrors,
  ) {
    this.bcrypt_salt = this.configService.getOrThrow<number>('app.bcrypt_salt');
  }

  /**
   * Creates a new user and saves it in the database.
   * @param createUserDto - DTO containing the user's creation data.
   * @returns Promise<User> - The created user.
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    const hashedPassword = this.hashPassword(password);
    const emailVerificationCode = this.generateVerificationToken();

    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      emailVerificationCode,
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.handleErrors.handleExceptions(error);
    }
  }

  /**
   * Finds a user by either ID or email.
   * @param searchTerm - The user ID or email to search for.
   * @returns Promise<User> - The found user or throws NotFoundException if not found.
   */
  async findUser(searchTerm: string): Promise<User> {
    const user = isUUID(searchTerm)
      ? await this.findUserById(searchTerm)
      : await this.findUserByEmail(searchTerm);

    if (!user) {
      throw new NotFoundException(`User with identifier ${searchTerm} not found.`);
    }

    return user;
  }

  /**
   * Verifies a user's email using the provided verification code.
   * If the code is valid, the email is marked as confirmed, and the verification code is cleared.
   *
   * @param emailCode - Unique verification code sent to the user's email.
   * @returns {Promise<string>} - Returns a message indicating that the email has been successfully verified.
   * @throws {NotFoundException} - Throws an exception if no user is found with the provided verification code.
   * @throws {BadRequestException} - Throws an exception if the email is already verified.
   */
  async verifyEmail(emailCode: string): Promise<string> {
    try {
      const user = await this.userRepository.findOne({ where: { emailVerificationCode: emailCode }});
      
      if (!user) {
        throw new NotFoundException(`User with verification code ${emailCode} not found.`);
      }
  
      if (user.isEmailConfirmed) {
        throw new BadRequestException(`User with email ${user.email} is already verified.`);
      }

      user.isEmailConfirmed = true;
      user.emailVerificationCode = null;
  
      await this.userRepository.save(user);
      return 'User email successfully verified';

    } catch (error) {
      this.handleErrors.handleExceptions(error);
    }
  }  

  /**
   * Deletes all users in the database.
   * @returns Promise<void>
   */
  async clearAllUsers(): Promise<void> {
    try {
      await this.userRepository.clear();
    } catch (error) {
      this.handleErrors.handleExceptions(error);
    }
  }

  // Helper Methods

  /**
   * Hashes a password using bcrypt.
   * @param password - The plain text password to hash.
   * @returns string - The hashed password.
   */
  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, this.bcrypt_salt);
  }

  /**
   * Generates a unique verification token for email validation.
   * @returns string - A UUID v4 token.
   */
  private generateVerificationToken(): string {
    return uuidv4();
  }

  /**
   * Finds a user by their ID.
   * @param id - The user ID to search for.
   * @returns Promise<User | null> - The found user or null.
   */
  private findUserById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  /**
   * Finds a user by their email.
   * @param email - The email to search for.
   * @returns Promise<User | null> - The found user or null.
   */
  private findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }
  
}

import { NextResponse } from 'next/server';
import { dbConnect } from '@/service/mongo';
import { User } from '@/models/user-model';
// import bcrypt from 'bcrypt';

// const SALT_ROUNDS = 10;

export async function POST(request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'All fields are required',
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email already registered',
        },
        { status: 400 }
      );
    }

    // const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // Store plain text password temporarily (not secure for production)
    });

    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        data: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to register user',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
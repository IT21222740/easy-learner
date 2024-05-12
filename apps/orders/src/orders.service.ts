import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from './constants/services';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(request: CreateOrderRequest) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, { session });
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request,
        }),
      );
      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getOrders() {
    return await this.ordersRepository.find({});
  }

  async getOrderById(id: string) {
    return await this.ordersRepository.findOne({ User_email: id });
  }

  async getPaidUsers(owner_id: string) {
    return await this.ordersRepository.find({ Cousre_Owner_id: owner_id });
  }

  async getTotalEarnings(owner_id: string): Promise<number> {
    const orders = await this.ordersRepository.find({
      Cousre_Owner_id: owner_id,
    });
    let total = 0; // Change const to let since total will be reassigned
    total = orders.reduce((acc, order) => acc + order.price, 0);
    return total;
  }

  async deleteOrder(id: string) {
    await this.ordersRepository.deleteOne({ _id: id });
  }
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ltharuka42@gmail.com',
      pass: 'bnrz mjii lovh ezaq',
    },
  });

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'ltharuka42@gmail.com',
      to,
      subject,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error; // Propagate the error
    }
  }
}

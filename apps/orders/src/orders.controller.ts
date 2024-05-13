import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';
import { Order } from './schemas/order.schema';
import Stripe from 'stripe';

@Controller('/')
export class OrdersController {
  private stripe: Stripe;
  constructor(private readonly ordersService: OrdersService) {
    this.stripe = new Stripe(
      'sk_test_51PBBftBKfM8g2ev1FzRWy6XtCUYaSzilfG3AlqZQQuVJkQUa39ImNmZVgsLbAEjiRJpRYhmjSWE7Dqi9gYFklmjr00RaNudRWu',
    );
  }

  @Post()
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {
    const result = this.ordersService.createOrder(request);
    try {
      const session = await this.stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/success',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: request.course_name,
              },
              unit_amount: request.price * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        client_reference_id: (await result)._id.toString(),
      });
      // await this.ordersService.sendEmail(
      //   req.body.email,
      //   'Enrollment Confirmation',
      //   `You have succssfully enrolled to ${req.course_name}`,
      // );
      return { sessionId: session.id, seesionUrl: session.url };
    } catch (error) {
      console.error('Error creating Stripe session:', error);
      throw error;
    }
  }

  @Post('webhook')
  async handleStripeWebhook(@Req() req: Request, @Res() res: Response) {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];
    const event = this.stripe.webhooks.constructEvent(
      payload.toString(), // Convert the payload to a string
      sig,
      'whsec_6a02a5d7ab17b27f28e2caab73c51bd733cd4e186249177f1acdd92388f94174',
    );
    // // if (event.type === 'checkout.session.completed') {
    // //   const orderObject = {
    // //     name: 'Product Name',
    // //     price: 1000,
    // //     email: 'k@g.com',
    // //   };
    // //   const result = this.ordersService.createOrder(orderObject);

    //   return { received: true };
    // } else {
    //   return { received: false };
    // }

    return { received: true };
  }

  @Get()
  async getOrders() {
    return await this.ordersService.getOrders();
  }

  @Get('my-orders/:email')
  async getMyOrders(@Param('email') email: string) {
    return await this.ordersService.getOrderById(email);
  }

  @Get('enrolled-users/:id')
  async getPaidUsers(@Param('id') id: string) {
    return await this.ordersService.getPaidUsers(id);
  }
  @Get('total-earnings/:id')
  async getTotalEarnings(@Param('id') id: string) {
    let total = await this.ordersService.getTotalEarnings(id);
    return { 'Total income': total };
  }

  @Delete('delete-paid-user/:id')
  async deletePaidUser(@Param('id') id: string) {
    return await this.ordersService.deleteOrder(id);
  }
}

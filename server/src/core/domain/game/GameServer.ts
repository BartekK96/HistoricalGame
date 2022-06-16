import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/game',
})
export class GameServer
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  private server!: Server;

  public async afterInit(server: Server): Promise<void> {
    console.log('Game Initialized');
  }

  public async handleDisconnect(client: Socket): Promise<void> {
    console.log(this.server.sockets);
  }

  public async handleConnection(client: Socket, ...args: any[]): Promise<void> {
    console.log('new user connected');
  }

  @SubscribeMessage('start-game')
  public async startGame(
    @MessageBody() data: any,
    ): Promise<Observable<WsResponse<number>>> {
        console.log(data)

    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

}

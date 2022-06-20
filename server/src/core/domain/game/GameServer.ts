import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameName } from './GameName';
import { GameService } from './GameService';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/game',
})
export class GameServer
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private gameService: GameService) {}

  @WebSocketServer()
  private server!: Server;

  public async afterInit(server: Server): Promise<void> {
    console.log('Game Initialized');
  }

  public async handleDisconnect(client: Socket): Promise<void> {
    // console.log('client disconneted');
  }

  public async handleConnection(client: Socket, ...args: any[]): Promise<void> {
    // console.log('client connected');
  }

  // todo: make authorizations somehow
  @SubscribeMessage('join-room')
  public async handleRoomJoin(
    client: Socket,
    data: { room: string; gameName: string; token: string },
  ): Promise<void> {
    await this.gameService.joinGame(data.token, new GameName(data.gameName));
    client.join(data.room);
    client.emit('joinedRoom', data.room);
  }

  @SubscribeMessage('leave-room')
  public async handleRoomLeave(
    client: Socket,
    data: { room: string },
  ): Promise<void> {
    client.leave(data.room);
    client.emit('leftRoom', data.room);
  }

  @SubscribeMessage('start-game')
  public async startGame(
    @MessageBody()
    message: {
      room: string;
    },
  ): Promise<void> {
    const game = this.server
      .to(message.room)
      .emit('game-started', { cards: 'card' });
  }

  //   @SubscribeMessage('start-game')
  //   public async startGame(
  //     client: Socket,
  //     @MessageBody()
  //     message: { room: string },
  //   ): Promise<Observable<WsResponse<number>>> {
  //     return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  //   }
}

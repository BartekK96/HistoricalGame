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
    data: { room: string; token: string },
  ): Promise<void> {
    client.join(data.room);
    await this.gameService.joinGame(data.token, new GameName(data.room));
    client.emit('joinedRoom', data.room);
  }

  @SubscribeMessage('leave-room')
  public async handleRoomLeave(
    client: Socket,
    data: { room: string; token: string },
  ): Promise<void> {
    client.leave(data.room);
    await this.gameService.leaveGame(data.token, new GameName(data.room));
    client.emit('leftRoom', data.room);
  }


  // owner start game APP -> server
  // server inform game is started server -> broadcast APP
  // each player get game status APP -> server
  // server response to each player with game status server -> APP
  // current player put a card APP -> server
  // server validate card status/game status -> server broadcast status updated -> APP
  // each player get game status(game finished or current player is changed) -> APP -> server


  @SubscribeMessage('start-game')
  public async startGame(
    @MessageBody()
    message: {
      room: string;
    },
  ): Promise<void> {
    // await this.gameService.startGame(new GameName(message.room));
    const game = this.server
      .to(message.room)
      .emit('game-started', { started: true });
  }

  @SubscribeMessage('get-current-set')
  public async giveCards(
    @MessageBody()
    message: {
      room: string;
      token: string;
    },
  ): Promise<void> {
    const status = await this.gameService.getCurrentGameStatus(
      message.token,
      new GameName(message.room),
    );

    this.server.emit('current-status', {
      playerCards: status.playerCards,
      cardsInGame: status.cardsInGame,
      currentPlayer: status.currentPlayer,
    });
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

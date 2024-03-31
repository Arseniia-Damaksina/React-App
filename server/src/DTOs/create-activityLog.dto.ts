export class CreateActivityLogDto {
  actionType: string;
  entityType: string;
  entityTypeId: number;
  createdAt: Date;
}

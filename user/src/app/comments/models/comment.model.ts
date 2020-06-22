export interface IComment {
    id: string;
    description: string;
    author: string;
    likes: string;
    whoLiked: string;
    postId: string;
    date: string;
  }

export class Comment implements IComment{
    id = '';
    description = '';
    author = '';
    likes = '';
    whoLiked = '';
    postId = '';
    date = '';
}


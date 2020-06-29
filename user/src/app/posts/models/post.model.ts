export interface IPost {
    id: string;
    title: string;
    description: string [];
    author: string;
    authorId: string;
    likes: string;
    whoLiked: string;
    date: string;
    comment: string;
    image: string [];
  }

export class Post implements IPost{
    id = '';
    title = '';
    description = [];
    author = '';
    authorId = '';
    likes = '';
    whoLiked = '';
    date = '';
    comment = '';
    image = [];
}


export interface Module {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
}

export interface UIModule {
  id: number;
  name: string;
  icon: string;
  route: string;
  backgroundColor: string;
  category: string;
}

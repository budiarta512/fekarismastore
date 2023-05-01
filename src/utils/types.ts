export interface IRegister {
  name: string;
  phone: string;
  password: string;
  role: string;
}

export interface ILogin {
  phone: string;
  password: string;
}

export interface IUser {
  _id: string;
  name: string;
  phone: string;
  role: "admin" | "customer";
}

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  supplier: ISupplier;
}

export interface ISupplier {
  _id: string;
  name: string;
  phone: string;
  address: string;
}

export interface IStoreSupplier {
  name: string;
  phone: string;
  address: string;
}

export interface ICart {
  _id: string;
  product: IProduct;
  order: IOrder;
  price: number;
  qty: number;
  total: number;
  additional_price: number | null;
}
export interface IStoreCart {
  product: string;
  order: string;
  price: number;
  qty: number;
  total: number;
  additional_price: number | null;
}

export interface IOrder {
  _id: string;
  user: IUser;
  carts: ICart[];
}

export interface IStoreTransaction {
  carts: ICartTransaction[] | undefined;
  customer: string;
  grand_total: number;
}

export interface ITransaction {
  _id: string;
  invoice_no: string;
  carts: ICartTransaction[];
  customer: IUser;
  grand_total: number;
  status: "MENUNGGU" | "SUKSES" | "TIDAK VALID";
  createdAt: Date;
}

export interface ICartTransaction {
  _id: string;
  product: string;
  price: number;
  qty: number;
  additional_price: number | null;
  total: number;
}

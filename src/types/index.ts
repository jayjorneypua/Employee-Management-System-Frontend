export interface Department {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: number;
  positionId: number;
  profilePicturePath?: string;
}

export interface Position {
  id: number;
  title: string;
  departmentId: number;
}

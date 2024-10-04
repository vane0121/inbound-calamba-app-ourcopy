export default interface IAsset {
  Id: number;
  EquipmentID: string;
  Type: string;
  Location: string;
  PurchaseDate: string; // Consider using Date type if needed
  Age: string; // Can also be structured if needed
  Condition: "Working" | "Defective"; // Use a union type for predefined conditions
  ColorCode: string; // Color code in string format (hex or other)
  IncidentDate: string; // Consider using Date type if needed
  Reported: string; // Adjust type if it can be something else
  LastAssignment: string; // Assign type based on expected values
}

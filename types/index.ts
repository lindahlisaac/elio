export type Coordinate = [longitude: number, latitude: number];

export type LineString = {
  type: 'LineString';
  coordinates: Coordinate[];
};

export type Polygon = {
  type: 'Polygon';
  coordinates: Coordinate[][];
};

export type Trail = {
  id: string;
  name: string;
  geometry: LineString;
  lengthMeters: number;
};

export type Activity = {
  id: string;
  userId: string;
  name: string;
  startedAt: string;
  polyline: LineString;
  source: 'strava' | 'gpx';
};

export type CoverageRegion = {
  id: string;
  name: string;
  slug: string;
  bounds: Polygon;
  trailCount: number;
  coveredPercent: number;
};

export type CoverageResult = {
  regionId: string;
  coveredMeters: number;
  totalMeters: number;
  coveredPercent: number;
  coveredTrailIds: string[];
};

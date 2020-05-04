class ISensor {
public:
  int id;
  char *name;
  char *units;
  char *description;
  int device_id;

  ISensor(int id, char *name, char *units, char *description)
    :id(id), name(name), units(units), description(description){}

  virtual void init_sensor();
  virtual float read_sensor();

};

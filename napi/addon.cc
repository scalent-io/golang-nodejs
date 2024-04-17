#include <napi.h>
#include <cmath>

auto calulcate() {
  auto result = 0.;
  for (int i = 0; i < 1e6; i++){
	result += std::sin(float(i)) * std::cos(float(i));
  }

  return result;
}

class CalcWorker : public Napi::AsyncWorker {
 public:
  CalcWorker(Napi::Function& callback)
      : Napi::AsyncWorker(callback), result(0) {}
  ~CalcWorker() {}

  void Execute() { result = calulcate(); }

  void OnOK() {
    Callback().Call({Env().Undefined(), Napi::Number::New(Env(), result)});
  }

 private:
  double result;
};

Napi::Value CalculateAsync(const Napi::CallbackInfo& info) {
  Napi::Function callback = info[0].As<Napi::Function>();
  CalcWorker* worker = new CalcWorker(callback);
  worker->Queue();
  return info.Env().Undefined();
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "heavyCalculation"), Napi::Function::New(env, CalculateAsync));
  return exports;
}

NODE_API_MODULE(addon, Init)

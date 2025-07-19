import CoreServices
import Foundation

let args = CommandLine.arguments

guard args.count >= 2 else {
  print("Usage: \(args[0]) <word>")
  exit(1)
}

let word = args[1] as CFString

// Search definition
let range = CFRange(location: 0, length: CFStringGetLength(word))
if let definition = DCSCopyTextDefinition(nil, word, range) {
  print(definition.takeRetainedValue())
} else {
  print("No definition")
}

import { H1, P } from 'app/design/typography'
import { View } from 'app/design/view'


export function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center p-3">
      <H1>Welcome to PureCodeX</H1>
      <View className="max-w-xl">
        <P className="text-center">
          Here is a basic starter to provide you with a quick overview of the
          project structure. Please, check the readme file for more details.
        </P>        
      </View>      
    </View>
  )
}

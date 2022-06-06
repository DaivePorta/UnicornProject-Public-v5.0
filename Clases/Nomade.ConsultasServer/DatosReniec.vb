Imports Microsoft.VisualBasic
Imports System.Runtime.InteropServices
Imports System.Text
Imports System.Threading.Timeout

Imports System
Imports System.Web
Imports System.Data
Imports System.IO

imports System.Collections.Generic
Imports System.Linq

Imports System.Threading.Tasks
Imports System.Drawing
Imports System.Net

Imports System.Text.RegularExpressions
Imports System.Collections.Specialized
Imports System.Drawing.Imaging
Imports System.Drawing.Imaging.ColorMap

Public Class DatosReniec


    <DllImport("kernel32.dll", SetLastError:=True)> _
    Public Shared Function WaitForSingleObject(ByVal handle As IntPtr, ByVal milliseconds As UInt32) As Int32
    End Function


    <DllImport("kernel32.dll")> _
    Public Shared Function OpenProcess(processAccess As Integer, bInheritHandle As Boolean, processId As Integer) As IntPtr
    End Function


    <DllImport("kernel32.dll", SetLastError:=True)> _
    Public Shared Function CloseHandle(ByVal hObject As IntPtr) As <MarshalAs(UnmanagedType.Bool)> Boolean
    End Function

    Const INFINITE As UInt32 = &HFFFFFFFFUI

    Const WAIT_ABANDONED As UInt32 = &H80UI
    Const WAIT_OBJECT_0 As UInt32 = &H0UI
    Const WAIT_TIMEOUT As UInt32 = &H102UI
    Const SYNCHRONIZE = &H100000
    Public Enum ProcessAccess As Integer
        ''' <summary>Specifies all possible access flags for the process object.</summary>
        AllAccess = CreateThread Or DuplicateHandle Or QueryInformation Or SetInformation Or Terminate Or VMOperation Or VMRead Or VMWrite Or SYNCHRONIZE
        ''' <summary>Enables usage of the process handle in the CreateRemoteThread function to create a thread in the process.</summary>
        CreateThread = &H2
        ''' <summary>Enables usage of the process handle as either the source or target process in the DuplicateHandle function to duplicate a handle.</summary>
        DuplicateHandle = &H40
        ''' <summary>Enables usage of the process handle in the GetExitCodeProcess and GetPriorityClass functions to read information from the process object.</summary>
        QueryInformation = &H400
        ''' <summary>Enables usage of the process handle in the SetPriorityClass function to set the priority class of the process.</summary>
        SetInformation = &H200
        ''' <summary>Enables usage of the process handle in the TerminateProcess function to terminate the process.</summary>
        Terminate = &H1
        ''' <summary>Enables usage of the process handle in the VirtualProtectEx and WriteProcessMemory functions to modify the virtual memory of the process.</summary>
        VMOperation = &H8
        ''' <summary>Enables usage of the process handle in the ReadProcessMemory function to' read from the virtual memory of the process.</summary>
        VMRead = &H10
        ''' <summary>Enables usage of the process handle in the WriteProcessMemory function to write to the virtual memory of the process.</summary>
        VMWrite = &H20
        ''' <summary>Enables usage of the process handle in any of the wait functions to wait for the process to terminate.</summary>
        Synchronize = &H100000
    End Enum
    <DllImport("urlmon.dll", CharSet:=CharSet.Auto, SetLastError:=True)> _
    Private Shared Function URLDownloadToFile(
                                                     <MarshalAs(UnmanagedType.IUnknown)> pCaller As Object, _
                                                     <MarshalAs(UnmanagedType.LPWStr)> szURL As String, _
                                                     <MarshalAs(UnmanagedType.LPWStr)> szFileName As String, _
                                                     dwReserved As Int32, lpfnCB As IntPtr) As Int32
    End Function

    Dim xDat As String

    Private myCookie As CookieContainer
    Dim _ruta As String
    Function GetDirTemp() As String
        Dim ruta As String = ""

        If Environ$("temp") <> vbNullString Then
            ruta = Environ$("temp")
        End If

        Return ruta
    End Function

    Sub Descargar(ByVal URL As String, ByVal rutaFisica As String)
        On Error GoTo Cualquiera

        Dim rf As String = ""
        rf = URL.Substring(29)
        Dim ruta_local = rutaFisica

        'Call URLDownloadToFile(0, URL, rutaFisica & "\reniec.tmp", 0, 0)
        Call URLDownloadToFile(0, URL, rutaFisica & rf & ".tmp", 0, 0)
        Exit Sub
Cualquiera:

        MsgBox("No responde el servicio de RENIEC", vbCritical, "Error")
    End Sub

    Function DescargaCaptcha(ByVal rutaFisica As String) As String
        On Error Resume Next
        Call Descargar("https://cel.reniec.gob.pe/valreg/codigo.do", rutaFisica)

        Return "\reniec.tmp"
    End Function

    Private _Nombres As String
    Private _ApePaterno As String
    Private _ApeMaterno As String

    Function OpenTxt(ByVal rutaFisica As String, ByVal documentoOrigen As String) As String
        On Error Resume Next

        Dim DocOrigen = documentoOrigen
        'Open "d:\sunat.txt" For Input As #1
        'FileOpen(1, rutaFisica & "\reniec.tmp", OpenMode.Input)
        FileOpen(1, rutaFisica & DocOrigen & ".tmp", OpenMode.Input)

        Dim Linea As String, Total As String = ""
        Do Until EOF(1)
            Linea = LineInput(1)
            Total = Total + Linea + vbCrLf
        Loop
        FileClose(1)
        OpenTxt = Total

        'Aquí elimina el txt que se genera
        If Len(Dir(rutaFisica & DocOrigen & ".tmp")) Then
            Kill(rutaFisica & DocOrigen & ".tmp")
        End If

    End Function

    Function ObtenerData(ByVal xNum As String, ByVal rutaLib As String) As String
        'On Error Resume Next
        On Error GoTo EsteErr
        Dim tmpVal As String
        Dim xTabla() As String
        Dim PosisionScript As Integer, PosisionScript1 As Integer
        Dim datos As String = ""

        'DPORTA_RF
        xDat = OpenTxt(rutaLib, xNum)

        xDat = Replace(xDat, vbCrLf, ",")
        xDat = Replace(xDat, "     ", " ")
        xDat = Replace(xDat, "    ", " ")
        xDat = Replace(xDat, "   ", " ")
        xDat = Replace(xDat, "  ", " ")

        xTabla = Split(xDat, ",")
        'DPORTA
        If xTabla.Length <= 1 Then

            Return "SIN_RESULTADOS"

        ElseIf xTabla.Length > 1 Then

            xTabla(5) = Replace(xTabla(5), Chr(34), "") '_ApePaterno
            xTabla(7) = Replace(xTabla(7), Chr(34), "") '_ApeMaterno
            xTabla(9) = Replace(xTabla(9), Chr(34), "") '_Nombres

            'xTabla(3) = Replace(xTabla(3), "</td>", "") '_ApePaterno
            'xTabla(4) = Replace(xTabla(4), "</td>", "") '_ApeMaterno
            'xTabla(5) = Replace(xTabla(5), "</td>", "") '_Nombres

            Dim ApPat = Split(xTabla(5), ":")
            Dim ApMat = Split(xTabla(7), ":")
            Dim Nombr = Split(xTabla(9), ":")

            _Nombres = (Nombr(1)).Trim()
            _ApeMaterno = (ApMat(1)).Trim()
            _ApePaterno = (ApPat(1)).Trim()

            datos = "[{""NOMBRES"":""" & _Nombres & """,""APEPATERNO"":""" & _ApePaterno & """,""APEMATERNO"":""" & _ApeMaterno & """}]"

        End If

        'Dim _split As String() = xDat.Split(New Char() {"<"c, ">"c, ControlChars.Lf, ControlChars.Cr})
        'Dim _resul As New List(Of String)()

        'For i As Integer = 0 To _split.Length - 1
        '    If Not String.IsNullOrEmpty(_split(i).Trim()) Then
        '        _resul.Add(_split(i).Trim())
        '    End If
        'Next

        'Select Case _resul.Count
        '    Case 217

        '        Return "CAPTCHA" 'ERROR
        '        Exit Select
        '    Case Is >= 232
        '        _Nombres = _resul(185)
        '        _ApePaterno = _resul(186)
        '        _ApeMaterno = _resul(187)
        '        Return "[{""NOMBRES"":""" & _Nombres & """,""APEPATERNO"":""" & _ApePaterno & """,""APEMATERNO"":""" & _ApeMaterno & """}]"
        '        Exit Select
        '    Case 222
        '        Return "SIN_RESULTADOS" 'ERROR
        '        Exit Select
        '    Case Else
        '        Return "ERROR"
        '        Exit Select
        'End Select

        Return datos

        ObtenerData = datos


        Exit Function
EsteErr:
        ObtenerData = "error"
        '    MsgBox Err.Number & " - " & Err.Description, vbCritical, "Error"
    End Function

    Function GetInfo(ByVal numDni As String, ByVal rutaLib As String, ByVal rutaDescarga As String) As String
        'Try
        '    'A este link le pasamos los datos , RUC y valor del captcha

        '    Dim myUrl As String = ""
        '    myUrl = [String].Format("https://cel.reniec.gob.pe/valreg/valreg.do?accion=buscar&nuDni={0}&imagen={1}", numDni, ImgCapcha)

        '    Call Descargar(myUrl, rutaLib)
        '    Return ObtenerData(numDni, rutaLib)
        'Catch ex As Exception
        '    Throw ex
        'End Try

        'DPORTA_RF
        'Dim hWeb = "http://aplicaciones007.jne.gob.pe/srop_publico/Consulta/Afiliado/GetNombresCiudadano?DNI="
        Dim hWeb = "https://api.reniec.cloud/dni/"

        If numDni <> "" Then
            Call Descargar(hWeb & numDni, rutaDescarga)
            Return ObtenerData(numDni, rutaDescarga)
        Else
            Return "SIN_RESULTADOS"
        End If

    End Function




End Class



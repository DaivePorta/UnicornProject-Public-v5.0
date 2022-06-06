
Imports System.Data

Public Class NCConfiguracionR

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function Listar_ConfiguracionRegional(ByVal p_CODE As String, ByVal p_CONFIGURACION As String, ByVal p_ESTADO_ID As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_CONFIGURACION_REGIONAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONFIGURACION", p_CONFIGURACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_ID", p_ESTADO_ID, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Crear_ConfiguracionRegional(ByVal p_NOM_CONF As String, ByVal p_IDIOMA As String, ByVal p_PAIS As String, ByVal p_MONE As String, ByVal p_ZONA_H As String, _
                                                ByVal p_UBICACION As String, ByVal p_SEPARACION As String, ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String) As Array

        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_CONFIGURACION_REGIONAL", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_NOM_CONF", p_NOM_CONF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IDIOMA", p_IDIOMA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAIS", p_PAIS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE", p_MONE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MERIDIANO", p_ZONA_H, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UBICACION", p_UBICACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SEPARACION", p_SEPARACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_ID", p_ESTADO_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_CODE_GENERADO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_ConfiguracionRegional(ByVal p_CODE As String, ByVal p_NOM_CONF As String, ByVal p_IDIOMA As String, ByVal p_PAIS As String, ByVal p_MONE As String, ByVal p_ZONA_H As String, _
                                               ByVal p_UBICACION As String, ByVal p_SEPARACION As String, ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String) As Array

        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_CONFIGURACION_REGIONAL", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOM_CONF", p_NOM_CONF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IDIOMA", p_IDIOMA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAIS", p_PAIS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE", p_MONE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ZONA_H", p_ZONA_H, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UBICACION", p_UBICACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SEPARACION", p_SEPARACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_ID", p_ESTADO_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_SALIDA").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstado_ConfiguracionRegional(ByVal p_CODE As String) As Array
        Try

            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CAMBIAR_ESTADO_CONF_REGIONAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_ESTADO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


End Class
